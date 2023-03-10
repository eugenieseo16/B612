package com.god.b612.repository;

import com.god.b612.dto.MemberResponseDto;
import com.god.b612.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberCustomRepositoryImpl implements MemberCustomRepository{
    @Autowired
    private final MemberRepository memberRepository;


    String[] adjective={"훌륭한", "가난한", "멋있는", "예쁜", "정착한","정직한","사랑많은","멋진","바보같은","공부를 잘하는","호기심 많은"};
    String[] noun={"왕자","사람","여우","사업가","멋쟁이","로봇","장미","매화"};

    public String makeRandomNickName(){
        StringBuilder sb=new StringBuilder();
        sb.append(adjective[(int) (Math.random()*adjective.length)]);
        sb.append(" ");
        sb.append(noun[(int)(Math.random()*noun.length)]);
        sb.append(memberRepository.findTopByMemberIdOrderByMemberIdDesc());

        return sb.toString();
    }

    @Override
    public MemberResponseDto createMemberResponseDtoByEntity(Member member) {
        MemberResponseDto memberResponseDto=MemberResponseDto.builder()
                .memberAddress(member.getMemberAddress())
                .memberNickname(member.getMemberNickname())
                .memberTierName(member.getMemberTierId().getTierName())
                .memberCurrentScore(member.getMemberCurrentScore())
                .memberImage(member.getMemberImage())
                .build();

        return memberResponseDto;
    }

}
